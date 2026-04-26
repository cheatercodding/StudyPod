"use client"

import { useState } from "react"
import { FileText, Loader2, PenLine, Sparkles, UploadCloud } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const API_BASE_URL = "http://127.0.0.1:5050"

export function StudyPodApp() {
  const [topic, setTopic] = useState("")
  const [draftNote, setDraftNote] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function generateNote() {
    if (!topic.trim()) {
      setMessage("Önce bir konu yaz.")
      return
    }

    try {
      setLoading(true)
      setMessage("")

      const response = await fetch(API_BASE_URL + "/api/notes/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Not oluşturulamadı.")
      }

      setResult(data.note)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  async function assistNote() {
    if (!draftNote.trim()) {
      setMessage("Düzenlemek için önce not alanına bir şey yaz.")
      return
    }

    try {
      setLoading(true)
      setMessage("")

      const response = await fetch(API_BASE_URL + "/api/notes/assist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: draftNote }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Not düzenlenemedi.")
      }

      setResult(data.note)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="app" className="relative overflow-hidden border-y border-border bg-background py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.16),transparent_34rem)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-4">
              StudyPod Çalışma Alanı
            </Badge>

            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Notunu burada oluşturmaya başla
            </h2>

            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Konu yaz, dağınık notunu toparla veya kaynaklarını eklemeye hazırlan.
              Bu bölüm StudyPod’un asıl uygulama alanı olacak.
            </p>
          </div>

          <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
            Test modu aktif
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="border-border/70 bg-card/80 shadow-xl shadow-slate-950/10">
            <CardHeader>
              <CardTitle>Not oluştur veya düzenle</CardTitle>
              <CardDescription>
                İstersen konu başlığından taslak not çıkar, istersen kendi yazdığın notu toparlat.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="generate" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="generate">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Konudan üret
                  </TabsTrigger>
                  <TabsTrigger value="assist">
                    <PenLine className="mr-2 h-4 w-4" />
                    Notu düzenle
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="generate" className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="topic">Konu başlığı</Label>
                    <Input
                      id="topic"
                      value={topic}
                      onChange={(event) => setTopic(event.target.value)}
                      placeholder="Örn: Parabol, Isı Alışverişi, DNA Eşlenmesi"
                    />
                  </div>

                  <Button onClick={generateNote} disabled={loading} className="w-full sm:w-auto">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Oluşturuluyor
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        Not oluştur
                      </>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="assist" className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="draft-note">Dağınık notun</Label>
                    <Textarea
                      id="draft-note"
                      value={draftNote}
                      onChange={(event) => setDraftNote(event.target.value)}
                      placeholder="Kısa kısa aldığın notları buraya yaz. StudyPod bunu daha düzenli hale getirsin."
                      className="min-h-44 resize-y"
                    />
                  </div>

                  <Button onClick={assistNote} disabled={loading} className="w-full sm:w-auto">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Düzenleniyor
                      </>
                    ) : (
                      <>
                        <PenLine className="mr-2 h-4 w-4" />
                        Notumu düzenle
                      </>
                    )}
                  </Button>
                </TabsContent>
              </Tabs>

              {message && (
                <p className="mt-5 rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-300">
                  {message}
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80 shadow-xl shadow-slate-950/10">
            <CardHeader>
              <CardTitle>Çıktı önizlemesi</CardTitle>
              <CardDescription>
                Oluşturulan veya düzenlenen not burada görünecek.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {result ? (
                <pre className="max-h-[520px] overflow-auto whitespace-pre-wrap rounded-2xl border border-border bg-background/80 p-5 text-sm leading-7 text-muted-foreground">
                  {result}
                </pre>
              ) : (
                <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background/50 p-8 text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                    <FileText className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    Henüz not oluşturulmadı
                  </p>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Sol taraftan bir konu yaz veya kendi notunu gir. Sonuç burada düzenli bir şekilde görünecek.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Card className="border-border/70 bg-card/60">
            <CardContent className="flex items-start gap-4 p-5">
              <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
                <UploadCloud className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Kaynak yükleme</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  PDF ve görselleri sonraki adımda notlarınla birlikte kullanacağız.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/60">
            <CardContent className="flex items-start gap-4 p-5">
              <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Düzenli taslak</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Konu başlığından hızlıca okunabilir ders notu taslağı çıkar.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/60">
            <CardContent className="flex items-start gap-4 p-5">
              <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
                <PenLine className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Not toparlama</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Dağınık yazdığın notları daha temiz ve tekrar edilebilir hale getir.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}