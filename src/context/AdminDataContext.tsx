"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { api } from "@/lib/api-client";
import type {
  ActivityItem,
  AdminCustomer,
  AdminOrder,
  AdminProduct,
  AdminShowroomItem,
  OrderStatus,
} from "@/lib/admin/types";

type Toast = {
  id: string;
  message: string;
  tone?: "success" | "error" | "info";
};

type AdminDataContextValue = {
  ready: boolean;
  loading: boolean;
  showroom: AdminShowroomItem[];
  products: AdminProduct[];
  orders: AdminOrder[];
  customers: AdminCustomer[];
  activity: ActivityItem[];
  toasts: Toast[];
  refresh: () => Promise<void>;
  pushToast: (message: string, tone?: Toast["tone"]) => void;
  dismissToast: (id: string) => void;
  upsertShowroomItem: (item: AdminShowroomItem) => Promise<void>;
  deleteShowroomItem: (id: string) => Promise<void>;
  upsertProduct: (item: AdminProduct) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
};

const AdminDataContext = createContext<AdminDataContextValue | null>(null);

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showroom, setShowroom] = useState<AdminShowroomItem[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    (message: string, tone: Toast["tone"] = "success") => {
      const id = uid("toast");
      setToasts((prev) => [...prev, { id, message, tone }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3200);
    },
    [],
  );

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [showroomData, productsData, ordersData, customersData, activityData] =
        await Promise.all([
          api.get<AdminShowroomItem[]>("/api/showroom"),
          api.get<AdminProduct[]>("/api/products?scope=admin"),
          api.get<AdminOrder[]>("/api/orders"),
          api.get<AdminCustomer[]>("/api/customers"),
          api.get<ActivityItem[]>("/api/activity"),
        ]);
      setShowroom(showroomData);
      setProducts(productsData);
      setOrders(ordersData);
      setCustomers(customersData);
      setActivity(activityData);
    } catch (err) {
      console.error(err);
      pushToast(
        err instanceof Error ? err.message : "Failed to load admin data",
        "error",
      );
    } finally {
      setLoading(false);
      setReady(true);
    }
  }, [pushToast]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const upsertShowroomItem = useCallback(
    async (item: AdminShowroomItem) => {
      const payload = {
        name: item.name,
        description: item.description,
        price: item.price,
        discountPrice: item.discountPrice,
        category: item.category,
        image: item.image,
        status: item.status,
        availability: item.availability,
      };
      const exists = showroom.some((s) => s.id === item.id);
      const saved = exists
        ? await api.put<AdminShowroomItem>(`/api/showroom/${item.id}`, payload)
        : await api.post<AdminShowroomItem>("/api/showroom", payload);
      setShowroom((prev) => {
        const found = prev.some((s) => s.id === saved.id);
        return found
          ? prev.map((s) => (s.id === saved.id ? saved : s))
          : [saved, ...prev];
      });
      const activityData = await api.get<ActivityItem[]>("/api/activity");
      setActivity(activityData);
    },
    [showroom],
  );

  const deleteShowroomItem = useCallback(async (id: string) => {
    await api.delete(`/api/showroom/${id}`);
    setShowroom((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const upsertProduct = useCallback(
    async (item: AdminProduct) => {
      const payload = {
        name: item.name,
        slug: item.slug,
        description: item.description,
        price: item.price,
        discountPrice: item.discountPrice,
        category: item.category,
        image: item.image,
        status: item.status,
        enabled: item.enabled,
      };
      const exists = products.some((p) => p.id === item.id);
      const saved = exists
        ? await api.put<AdminProduct>(`/api/products/${item.id}`, payload)
        : await api.post<AdminProduct>("/api/products", payload);
      setProducts((prev) => {
        const found = prev.some((p) => p.id === saved.id);
        return found
          ? prev.map((p) => (p.id === saved.id ? saved : p))
          : [saved, ...prev];
      });
      const activityData = await api.get<ActivityItem[]>("/api/activity");
      setActivity(activityData);
    },
    [products],
  );

  const deleteProduct = useCallback(async (id: string) => {
    await api.delete(`/api/products/${id}`);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateOrderStatus = useCallback(
    async (id: string, status: OrderStatus) => {
      const saved = await api.patch<AdminOrder>(`/api/orders/${id}`, {
        status,
      });
      setOrders((prev) => prev.map((o) => (o.id === id ? saved : o)));
      const activityData = await api.get<ActivityItem[]>("/api/activity");
      setActivity(activityData);
    },
    [],
  );

  const value = useMemo(
    () => ({
      ready,
      loading,
      showroom,
      products,
      orders,
      customers,
      activity,
      toasts,
      refresh,
      pushToast,
      dismissToast,
      upsertShowroomItem,
      deleteShowroomItem,
      upsertProduct,
      deleteProduct,
      updateOrderStatus,
    }),
    [
      ready,
      loading,
      showroom,
      products,
      orders,
      customers,
      activity,
      toasts,
      refresh,
      pushToast,
      dismissToast,
      upsertShowroomItem,
      deleteShowroomItem,
      upsertProduct,
      deleteProduct,
      updateOrderStatus,
    ],
  );

  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext);
  if (!ctx) {
    throw new Error("useAdminData must be used within AdminDataProvider");
  }
  return ctx;
}
