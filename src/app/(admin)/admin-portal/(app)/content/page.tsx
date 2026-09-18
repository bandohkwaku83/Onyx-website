"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import { useWebsiteContent } from "@/context/WebsiteContentContext";
import type { DetailCard, WebsiteContent } from "@/lib/admin/types";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import {
  Field,
  TextArea,
  TextInput,
} from "@/components/admin/ui/FormFields";
import { ImageUpload } from "@/components/admin/ui/ImageUpload";
import { PageHeader } from "@/components/admin/ui/PageHeader";

type Section = "home" | "shop" | "contact";
type HomeBlock = "hero" | "details" | "cta";

export default function ContentPage() {
  const { pushToast } = useAdminData();
  const { content, updateContent, ready } = useWebsiteContent();
  const [draft, setDraft] = useState<WebsiteContent>(content);
  const [section, setSection] = useState<Section>("home");
  const [homeBlock, setHomeBlock] = useState<HomeBlock>("hero");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (ready) setDraft(content);
  }, [ready, content]);

  const syncDraft = () => setDraft(content);

  const publish = async (note: string) => {
    setSaving(true);
    try {
      await updateContent(draft, note);
      pushToast(note);
    } catch (err) {
      pushToast(
        err instanceof Error ? err.message : "Failed to publish content",
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  const updateCard = (
    id: string,
    patch: Partial<DetailCard>,
  ) => {
    setDraft((prev) => ({
      ...prev,
      detailsSection: {
        ...prev.detailsSection,
        cards: prev.detailsSection.cards.map((card) =>
          card.id === id ? { ...card, ...patch } : card,
        ),
      },
    }));
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Public website"
        title="Website"
        description="Update Home and Contact heroes, the details section, and the homepage CTA. Publishing applies to the live site."
        actions={
          <AdminButton type="button" variant="outline" onClick={syncDraft}>
            Reset to published
          </AdminButton>
        }
      />

      <div className="flex flex-wrap gap-0 border-b border-charcoal/10">
        {(
          [
            ["home", "Home"],
            ["shop", "Shop"],
            ["contact", "Contact"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setSection(id)}
            className={`px-4 py-3 text-[11px] tracking-[0.16em] uppercase transition ${
              section === id
                ? "border-b-2 border-primary text-primary"
                : "text-stone hover:text-charcoal"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {section === "home" ? (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["hero", "Hero"],
                ["details", "Details section"],
                ["cta", "CTA band"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setHomeBlock(id)}
                className={`border px-3.5 py-2 text-[11px] tracking-[0.14em] uppercase transition ${
                  homeBlock === id
                    ? "border-primary bg-primary text-ivory"
                    : "border-charcoal/15 bg-white text-charcoal/70 hover:border-charcoal/30"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {homeBlock === "hero" ? (
            <div className="grid gap-6 lg:grid-cols-5">
              <div className="space-y-5 border border-charcoal/10 bg-white p-5 sm:p-6 lg:col-span-3">
                <ImageUpload
                  label="Home hero image"
                  value={draft.homeHero.image}
                  onChange={(url) =>
                    setDraft((prev) => ({
                      ...prev,
                      homeHero: { ...prev.homeHero, image: url ?? "" },
                    }))
                  }
                />
                <Field label="Eyebrow" htmlFor="home-eyebrow">
                  <TextInput
                    id="home-eyebrow"
                    value={draft.homeHero.eyebrow}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        homeHero: {
                          ...prev.homeHero,
                          eyebrow: e.target.value,
                        },
                      }))
                    }
                  />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Heading line 1" htmlFor="home-heading">
                    <TextInput
                      id="home-heading"
                      value={draft.homeHero.heading}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          homeHero: {
                            ...prev.homeHero,
                            heading: e.target.value,
                          },
                        }))
                      }
                    />
                  </Field>
                  <Field label="Heading accent (italic)" htmlFor="home-accent">
                    <TextInput
                      id="home-accent"
                      value={draft.homeHero.headingAccent}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          homeHero: {
                            ...prev.homeHero,
                            headingAccent: e.target.value,
                          },
                        }))
                      }
                    />
                  </Field>
                </div>
                <Field label="Description" htmlFor="home-desc">
                  <TextArea
                    id="home-desc"
                    value={draft.homeHero.description}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        homeHero: {
                          ...prev.homeHero,
                          description: e.target.value,
                        },
                      }))
                    }
                  />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Primary button" htmlFor="home-cta-1">
                    <TextInput
                      id="home-cta-1"
                      value={draft.homeHero.primaryCta}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          homeHero: {
                            ...prev.homeHero,
                            primaryCta: e.target.value,
                          },
                        }))
                      }
                    />
                  </Field>
                  <Field label="Secondary button" htmlFor="home-cta-2">
                    <TextInput
                      id="home-cta-2"
                      value={draft.homeHero.secondaryCta}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          homeHero: {
                            ...prev.homeHero,
                            secondaryCta: e.target.value,
                          },
                        }))
                      }
                    />
                  </Field>
                </div>
                <div className="flex justify-end border-t border-charcoal/10 pt-4">
                  <AdminButton
                    type="button"
                    loading={saving}
                    onClick={() =>
                      void publish("Home hero published successfully.")
                    }
                  >
                    Publish hero
                  </AdminButton>
                </div>
              </div>
              <PreviewCard
                label="Hero preview"
                image={draft.homeHero.image}
                title={`${draft.homeHero.heading} ${draft.homeHero.headingAccent}`}
                body={draft.homeHero.description}
                cta={draft.homeHero.primaryCta}
              />
            </div>
          ) : null}

          {homeBlock === "details" ? (
            <div className="space-y-6">
              <div className="space-y-5 border border-charcoal/10 bg-white p-5 sm:p-6">
                <p className="text-[10px] tracking-[0.18em] text-stone uppercase">
                  Section heading
                </p>
                <Field label="Eyebrow" htmlFor="details-eyebrow">
                  <TextInput
                    id="details-eyebrow"
                    value={draft.detailsSection.eyebrow}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        detailsSection: {
                          ...prev.detailsSection,
                          eyebrow: e.target.value,
                        },
                      }))
                    }
                    placeholder="Designed For Beautiful Spaces"
                  />
                </Field>
                <Field label="Title" htmlFor="details-title">
                  <TextInput
                    id="details-title"
                    value={draft.detailsSection.title}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        detailsSection: {
                          ...prev.detailsSection,
                          title: e.target.value,
                        },
                      }))
                    }
                    placeholder="Where Every Detail Matters"
                  />
                </Field>
              </div>

              {draft.detailsSection.cards.map((card, index) => (
                <div
                  key={card.id}
                  className="grid gap-6 border border-charcoal/10 bg-white p-5 sm:p-6 lg:grid-cols-2"
                >
                  <div className="space-y-4">
                    <p className="text-[10px] tracking-[0.18em] text-stone uppercase">
                      Card {index + 1}
                    </p>
                    <ImageUpload
                      label="Card image"
                      value={card.image}
                      onChange={(url) =>
                        updateCard(card.id, { image: url ?? "" })
                      }
                    />
                  </div>
                  <div className="space-y-4">
                    <Field label="Subtitle" htmlFor={`${card.id}-subtitle`}>
                      <TextInput
                        id={`${card.id}-subtitle`}
                        value={card.subtitle}
                        onChange={(e) =>
                          updateCard(card.id, { subtitle: e.target.value })
                        }
                      />
                    </Field>
                    <Field label="Title" htmlFor={`${card.id}-title`}>
                      <TextInput
                        id={`${card.id}-title`}
                        value={card.title}
                        onChange={(e) =>
                          updateCard(card.id, { title: e.target.value })
                        }
                      />
                    </Field>
                    <Field label="Description" htmlFor={`${card.id}-desc`}>
                      <TextArea
                        id={`${card.id}-desc`}
                        value={card.description}
                        onChange={(e) =>
                          updateCard(card.id, { description: e.target.value })
                        }
                      />
                    </Field>
                  </div>
                </div>
              ))}

              <div className="flex justify-end">
                <AdminButton
                  type="button"
                  loading={saving}
                  onClick={() =>
                    void publish("Details section published successfully.")
                  }
                >
                  Publish details section
                </AdminButton>
              </div>
            </div>
          ) : null}

          {homeBlock === "cta" ? (
            <div className="grid gap-6 lg:grid-cols-5">
              <div className="space-y-5 border border-charcoal/10 bg-white p-5 sm:p-6 lg:col-span-3">
                <ImageUpload
                  label="CTA background image"
                  value={draft.homeCta.image}
                  onChange={(url) =>
                    setDraft((prev) => ({
                      ...prev,
                      homeCta: { ...prev.homeCta, image: url ?? "" },
                    }))
                  }
                />
                <Field label="Eyebrow" htmlFor="cta-eyebrow">
                  <TextInput
                    id="cta-eyebrow"
                    value={draft.homeCta.eyebrow}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        homeCta: { ...prev.homeCta, eyebrow: e.target.value },
                      }))
                    }
                  />
                </Field>
                <Field label="Title" htmlFor="cta-title">
                  <TextInput
                    id="cta-title"
                    value={draft.homeCta.title}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        homeCta: { ...prev.homeCta, title: e.target.value },
                      }))
                    }
                  />
                </Field>
                <Field label="Description" htmlFor="cta-desc">
                  <TextArea
                    id="cta-desc"
                    value={draft.homeCta.description}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        homeCta: {
                          ...prev.homeCta,
                          description: e.target.value,
                        },
                      }))
                    }
                  />
                </Field>
                <Field label="Button label" htmlFor="cta-button">
                  <TextInput
                    id="cta-button"
                    value={draft.homeCta.buttonLabel}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        homeCta: {
                          ...prev.homeCta,
                          buttonLabel: e.target.value,
                        },
                      }))
                    }
                  />
                </Field>
                <div className="flex justify-end border-t border-charcoal/10 pt-4">
                  <AdminButton
                    type="button"
                    loading={saving}
                    onClick={() =>
                      void publish("Homepage CTA published successfully.")
                    }
                  >
                    Publish CTA
                  </AdminButton>
                </div>
              </div>
              <PreviewCard
                label="CTA preview"
                image={draft.homeCta.image}
                title={draft.homeCta.title}
                body={draft.homeCta.description}
                cta={draft.homeCta.buttonLabel}
              />
            </div>
          ) : null}
        </div>
      ) : null}

      {section === "shop" ? (
        <div className="space-y-5 border border-charcoal/10 bg-white p-5 sm:p-6">
          <p className="text-sm font-light leading-relaxed text-charcoal/60">
            Product imagery and catalogue items are managed in Products and
            Shop. Use this intro for featured shop copy.
          </p>
          <Field label="Shop intro" htmlFor="shop-intro">
            <TextArea
              id="shop-intro"
              value={draft.shopIntro}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, shopIntro: e.target.value }))
              }
            />
          </Field>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin-portal/products">
              <AdminButton type="button" variant="outline">
                Manage products
              </AdminButton>
            </Link>
            <AdminButton
              type="button"
              loading={saving}
              onClick={() => void publish("Shop intro published successfully.")}
            >
              Publish shop intro
            </AdminButton>
          </div>
        </div>
      ) : null}

      {section === "contact" ? (
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="space-y-5 border border-charcoal/10 bg-white p-5 sm:p-6 lg:col-span-3">
            <ImageUpload
              label="Contact hero image"
              value={draft.contactHero.image}
              onChange={(url) =>
                setDraft((prev) => ({
                  ...prev,
                  contactHero: { ...prev.contactHero, image: url ?? "" },
                }))
              }
            />
            <Field label="Eyebrow" htmlFor="contact-eyebrow">
              <TextInput
                id="contact-eyebrow"
                value={draft.contactHero.eyebrow}
                onChange={(e) =>
                  setDraft((prev) => ({
                    ...prev,
                    contactHero: {
                      ...prev.contactHero,
                      eyebrow: e.target.value,
                    },
                  }))
                }
              />
            </Field>
            <Field label="Heading" htmlFor="contact-heading">
              <TextInput
                id="contact-heading"
                value={draft.contactHero.heading}
                onChange={(e) =>
                  setDraft((prev) => ({
                    ...prev,
                    contactHero: {
                      ...prev.contactHero,
                      heading: e.target.value,
                    },
                  }))
                }
              />
            </Field>
            <Field label="Description" htmlFor="contact-desc">
              <TextArea
                id="contact-desc"
                value={draft.contactHero.description}
                onChange={(e) =>
                  setDraft((prev) => ({
                    ...prev,
                    contactHero: {
                      ...prev.contactHero,
                      description: e.target.value,
                    },
                  }))
                }
              />
            </Field>
            <div className="flex justify-end border-t border-charcoal/10 pt-4">
              <AdminButton
                type="button"
                loading={saving}
                onClick={() =>
                  void publish("Contact hero published successfully.")
                }
              >
                Publish contact hero
              </AdminButton>
            </div>
          </div>
          <PreviewCard
            label="Contact preview"
            image={draft.contactHero.image}
            title={draft.contactHero.heading}
            body={draft.contactHero.description}
          />
        </div>
      ) : null}
    </div>
  );
}

function PreviewCard({
  label,
  image,
  title,
  body,
  cta,
}: {
  label: string;
  image: string;
  title: string;
  body: string;
  cta?: string;
}) {
  return (
    <div className="lg:col-span-2">
      <div className="overflow-hidden border border-charcoal/10 bg-charcoal text-ivory">
        <p className="border-b border-white/10 px-4 py-3 text-[10px] tracking-[0.2em] text-ivory/50 uppercase">
          {label}
        </p>
        <div className="relative aspect-[4/5] bg-charcoal">
          {image ? (
            <Image
              src={image}
              alt=""
              fill
              className="object-cover opacity-70"
              unoptimized={image.startsWith("blob:")}
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="font-serif text-2xl font-light leading-snug">
              {title || "Heading"}
            </p>
            <p className="mt-2 line-clamp-3 text-sm font-light text-ivory/70">
              {body || "Description"}
            </p>
            {cta ? (
              <span className="mt-4 inline-block border border-ivory/40 px-4 py-2 text-[10px] tracking-[0.16em] uppercase">
                {cta}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
