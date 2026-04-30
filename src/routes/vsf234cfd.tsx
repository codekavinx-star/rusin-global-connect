import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Lock, LogOut, Trash2, Upload, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/vsf234cfd")({
  head: () => ({ meta: [{ title: "Admin — RUSIN" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: AdminPage,
});

type GalleryRow = { id: string; title: string; image_url: string; storage_path: string; created_at: string };

function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [images, setImages] = useState<GalleryRow[]>([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      checkAccess(session?.user?.id);
    });
    supabase.auth.getSession().then(({ data }) => checkAccess(data.session?.user?.id));
    return () => sub.subscription.unsubscribe();
  }, []);

  const checkAccess = async (userId?: string) => {
    if (!userId) { setAuthed(false); setIsAdmin(false); setLoading(false); return; }
    setAuthed(true);
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
    setIsAdmin(!!data);
    setLoading(false);
    if (data) loadImages();
  };

  const loadImages = async () => {
    const { data } = await supabase.from("gallery_images").select("*").order("created_at", { ascending: false });
    setImages(data ?? []);
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (error) { toast.error("Invalid Credentials"); return; }
    toast.success("Welcome back");
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setAuthed(false); setIsAdmin(false);
    navigate({ to: "/" });
  };

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Image files only"); return; }
    if (file.size > 8 * 1024 * 1024) { toast.error("Max 8MB"); return; }
    setUploading(true);
    const { data: { user } } = await supabase.auth.getUser();
    const path = `${user!.id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const { error: upErr } = await supabase.storage.from("gallery").upload(path, file);
    if (upErr) { setUploading(false); toast.error(upErr.message); return; }
    const { data: pub } = supabase.storage.from("gallery").getPublicUrl(path);
    const { error: insErr } = await supabase.from("gallery_images").insert({
      title: file.name, image_url: pub.publicUrl, storage_path: path, uploaded_by: user!.id,
    });
    setUploading(false);
    e.target.value = "";
    if (insErr) { toast.error(insErr.message); return; }
    toast.success("Uploaded");
    loadImages();
  };

  const remove = async (img: GalleryRow) => {
    if (!confirm("Delete this image?")) return;
    await supabase.storage.from("gallery").remove([img.storage_path]);
    const { error } = await supabase.from("gallery_images").delete().eq("id", img.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    loadImages();
  };

  if (loading) return <div className="min-h-screen grid place-items-center"><Loader2 className="animate-spin text-primary" /></div>;

  if (!authed || !isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-to-br from-primary via-primary to-[oklch(0.25_0.08_260)] p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md glass-dark rounded-3xl p-8 shadow-elegant text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-white/15 grid place-items-center"><Lock /></div>
            <div>
              <h1 className="font-display text-2xl font-bold">Admin Access</h1>
              <p className="text-xs text-white/70">RUSIN restricted area</p>
            </div>
          </div>
          {authed && !isAdmin ? (
            <>
              <p className="text-sm text-white/85 mb-4">You're signed in but not an admin.</p>
              <button onClick={logout} className="w-full rounded-xl bg-white text-primary py-3 font-semibold">Sign out</button>
            </>
          ) : (
            <form onSubmit={login} className="space-y-3">
              <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-sm placeholder:text-white/50 focus:outline-none focus:border-white/40" />
              <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-sm placeholder:text-white/50 focus:outline-none focus:border-white/40" />
              <button disabled={submitting} className="w-full rounded-xl bg-accent text-accent-foreground py-3 font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-70">
                {submitting ? <Loader2 size={16} className="animate-spin" /> : null} Sign In
              </button>
            </form>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="sticky top-0 z-30 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold">RUSIN Admin</h1>
            <p className="text-xs text-muted-foreground">Gallery management</p>
          </div>
          <button onClick={logout} className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium hover:bg-muted">
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="rounded-3xl bg-card border border-border shadow-card p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold">Gallery Images</h2>
              <p className="text-sm text-muted-foreground">{images.length} image{images.length === 1 ? "" : "s"}</p>
            </div>
            <label className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-gradient-brand text-primary-foreground px-5 py-3 font-semibold shadow-card hover:scale-105 transition-transform">
              {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
              {uploading ? "Uploading…" : "Upload Image"}
              <input type="file" accept="image/*" className="hidden" onChange={upload} disabled={uploading} />
            </label>
          </div>
        </div>

        {images.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-border p-16 text-center text-muted-foreground">
            <ImageIcon size={36} className="mx-auto mb-3 opacity-50" />
            No images yet. Upload your first.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map(img => (
              <div key={img.id} className="group relative rounded-2xl overflow-hidden bg-card shadow-card border border-border">
                <div className="aspect-square overflow-hidden">
                  <img src={img.image_url} alt={img.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <div className="text-xs font-medium truncate">{img.title}</div>
                  <div className="text-[10px] text-muted-foreground">{new Date(img.created_at).toLocaleDateString()}</div>
                </div>
                <button onClick={() => remove(img)} className="absolute top-2 right-2 h-9 w-9 grid place-items-center rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
