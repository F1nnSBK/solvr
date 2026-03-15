# Solvr

> Lernplattform für WDS124 – Lösungen teilen, gemeinsam verstehen.

Solvr ist eine community-getriebene Lernplattform für das Modul **WDS124 (Mathematik & Informatik)**. Studierende können Lösungen zu Aufgaben hochladen, kommentieren und sich gegenseitig beim Lernen helfen.

---

## Features

- **Modulübersicht** – alle 7 Themenblöcke strukturiert aufbereitet
- **Themen-Seiten** – Inhalte pro Unterthema mit Formeln und Erklärungen
- **Lösungen & Kommentare** – angemeldete Nutzer können Lösungen hochladen und diskutieren
- **Aufgabe der Woche** – wöchentlich wechselnde Challenge für die Community
- **Magic Link Auth** – kein Passwort nötig, Login per E-Mail-Link
- **Dark Mode** – standardmäßig aktiv

---

## Tech Stack

| Bereich | Technologie |
|---|---|
| Framework | [Nuxt 4](https://nuxt.com) |
| UI | [Nuxt UI v4](https://ui.nuxt.com) + [Tailwind CSS v4](https://tailwindcss.com) |
| Auth & DB | [Supabase](https://supabase.com) |
| Icons | [Lucide](https://lucide.dev) |
| Package Manager | [pnpm](https://pnpm.io) |

---

## Voraussetzungen

- **Node.js** >= 20
- **pnpm** >= 10
- Ein [Supabase](https://supabase.com) Projekt (kostenlos)

---

## Setup

### 1. Repository klonen

```bash
git clone https://github.com/dein-username/solvr.git
cd solvr
```

### 2. Dependencies installieren

```bash
pnpm install
```

### 3. Umgebungsvariablen anlegen

Erstelle eine `.env` Datei im Root-Verzeichnis:

```env
SUPABASE_URL=https://deine-projekt-id.supabase.co
SUPABASE_KEY=dein-anon-key
```

Beide Werte findest du im Supabase Dashboard unter **Project Settings → API**.

### 4. Datenbank einrichten

Führe folgende SQL-Befehle in deinem Supabase SQL-Editor aus:

```sql
-- Lösungen / Kommentare
create table solutions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  topic_id text not null,
  content text not null,
  created_at timestamp with time zone default now()
);

-- Aufgabe der Woche
create table weekly_tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  module_id text,
  due_date date,
  created_at timestamp with time zone default now()
);

-- Row Level Security aktivieren
alter table solutions enable row level security;
alter table weekly_tasks enable row level security;

-- Alle können Lösungen lesen
create policy "solutions are public"
  on solutions for select using (true);

-- Nur eigene Lösungen schreiben
create policy "users insert own solutions"
  on solutions for insert
  with check (auth.uid() = user_id);

-- Weekly Tasks öffentlich lesbar
create policy "weekly tasks are public"
  on weekly_tasks for select using (true);
```

### 5. TypeScript-Typen generieren (optional, empfohlen)

```bash
npx supabase gen types typescript --project-id deine-projekt-id > app/types/database.types.ts
```

### 6. Entwicklungsserver starten

```bash
pnpm dev
```

Die App läuft auf [http://localhost:3000](http://localhost:3000).

---

## Projektstruktur

```
solvr/
├── app/
│   ├── assets/
│   │   └── css/
│   │       └── main.css
│   ├── components/
│   │   ├── SidebarContent.vue    # Sidebar-Navigation (shared)
│   │   ├── ModuleCard.vue        # Karte pro Modul
│   │   ├── TopicList.vue         # Themenliste einer Modul-Seite
│   │   ├── SolutionCard.vue      # Einzelne Lösung / Kommentar
│   │   └── WeeklyTask.vue        # Aufgabe der Woche Widget
│   ├── layouts/
│   │   └── default.vue           # Sidebar (Desktop) + Top-Nav (Mobile)
│   ├── pages/
│   │   ├── index.vue             # Startseite
│   │   ├── weekly.vue            # Aufgabe der Woche
│   │   ├── auth/
│   │   │   ├── login.vue         # Magic Link Login
│   │   │   └── confirm.vue       # Auth Callback
│   │   └── modules/
│   │       ├── index.vue         # Modulübersicht
│   │       ├── [module].vue      # Modul-Seite
│   │       └── [module]/
│   │           └── [topic].vue   # Themen-Seite + Kommentare
│   ├── types/
│   │   └── database.types.ts     # Supabase-Typen (generiert)
│   └── app.vue
├── nuxt.config.ts
├── .env                          # nicht ins Git!
└── package.json
```

---

## Beitragen

### Lösung hochladen

1. Mit Magic Link anmelden (`/auth/login`)
2. Gewünschtes Thema öffnen
3. Lösung im Textfeld eingeben und absenden

### Aufgabe der Woche vorschlagen

Öffne ein [GitHub Issue](https://github.com/dein-username/solvr/issues) mit dem Label `weekly-task` und beschreibe die Aufgabe.

---

## Deployment

Das Projekt lässt sich einfach auf [Vercel](https://vercel.com) oder [Netlify](https://netlify.com) deployen.

```bash
# Produktions-Build testen
pnpm build
pnpm preview
```

Umgebungsvariablen (`SUPABASE_URL`, `SUPABASE_KEY`) müssen in den Deployment-Einstellungen der jeweiligen Plattform gesetzt werden.

---

## Lizenz

MIT License © 2024 Finn Hertsch

