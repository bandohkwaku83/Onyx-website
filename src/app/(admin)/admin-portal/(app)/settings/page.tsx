"use client";

import { FormEvent, useState } from "react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useAdminData } from "@/context/AdminDataContext";
import { BRAND } from "@/lib/constants";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { Field, TextInput } from "@/components/admin/ui/FormFields";
import { PageHeader } from "@/components/admin/ui/PageHeader";

export default function SettingsPage() {
  const { session } = useAdminAuth();
  const { pushToast } = useAdminData();
  const [displayName, setDisplayName] = useState(session?.name ?? "");
  const [email, setEmail] = useState(session?.email ?? "");
  const [notifications, setNotifications] = useState(true);
  const [saving, setSaving] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    pushToast("Settings saved successfully.");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader
        title="Settings"
        description="Account preferences and portal configuration. Ready to connect to real auth later."
      />

      <form
        onSubmit={onSubmit}
        className="space-y-5 border border-charcoal/10 bg-white p-5 sm:p-6"
      >
        <h2 className="font-serif text-lg font-light text-charcoal">
          Admin profile
        </h2>
        <Field label="Display name" htmlFor="settings-name">
          <TextInput
            id="settings-name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </Field>
        <Field label="Email" htmlFor="settings-email">
          <TextInput
            id="settings-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-charcoal">
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="h-4 w-4 rounded border-charcoal/20 text-primary focus:ring-primary/30"
          />
          Email me when new checkouts arrive
        </label>
        <div className="flex justify-end border-t border-charcoal/10 pt-4">
          <AdminButton type="submit" loading={saving}>
            Save settings
          </AdminButton>
        </div>
      </form>

      <div className="border border-charcoal/10 bg-white p-5 sm:p-6">
        <h2 className="font-serif text-lg font-light text-charcoal">
          Workspace
        </h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-stone">Organisation</dt>
            <dd className="font-medium text-charcoal">{BRAND.name}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-stone">Role</dt>
            <dd className="font-medium text-charcoal">
              {session?.role ?? "Administrator"}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-stone">Environment</dt>
            <dd className="font-medium text-charcoal">UI demo (no API yet)</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
