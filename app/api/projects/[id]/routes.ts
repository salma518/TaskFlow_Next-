import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

function readDB() {
  const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  return data;
}

function writeDB(data: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// GET : récupérer un projet par son id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const db = readDB();
  const project = db.projects.find((p: any) => p.id === params.id);

  if (!project) {
    return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
  }

  return NextResponse.json(project);
}

// PUT : modifier un projet
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const db = readDB();
  
  const index = db.projects.findIndex((p: any) => p.id === params.id);
  
  if (index === -1) {
    return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
  }
  
  db.projects[index] = { ...db.projects[index], ...body };
  writeDB(db);
  
  return NextResponse.json(db.projects[index]);
}

// DELETE : supprimer un projet
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const db = readDB();
  
  const index = db.projects.findIndex((p: any) => p.id === params.id);
  
  if (index === -1) {
    return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
  }
  
  db.projects.splice(index, 1);
  writeDB(db);
  
  return NextResponse.json({ message: 'Projet supprimé' });
}