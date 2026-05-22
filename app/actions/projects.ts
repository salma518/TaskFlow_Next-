// 'use server';

// import { revalidatePath } from 'next/cache';

// export async function addProject(formData: FormData) {
//   const name = formData.get('name') as string;
//   const color = formData.get('color') as string;

//   // await fetch('http://localhost:4000/projects', {
//   //   method: 'POST',
//   //   headers: { 'Content-Type': 'application/json' },
//   //   body: JSON.stringify({ name, color }),
//   // });

//   await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/projects`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ name, color }),
//   });


//   revalidatePath('/dashboard');
// }

// //renameProject
// export async function renameProject(formData: FormData) {
//   const id = formData.get('id') as string;
//   const newName = formData.get('newName') as string;

//   const res = await fetch(`http://localhost:4000/projects/${id}`);
//   const project = await res.json();


//   await fetch(`http://localhost:4000/projects/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       name: newName,
//       color: project.color,
//     }),
//   });

//   // 3. Revalider la page
//   revalidatePath('/dashboard');

  
// }

// //deleteProject
// export async function deleteProject(formData: FormData) {
//   const id = formData.get('id') as string;

//   await fetch(`http://localhost:4000/projects/${id}`, {
//     method: 'DELETE',
//   });

//   revalidatePath('/dashboard');
// }


'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Ajouter un projet
export async function addProject(formData: FormData) {
  const name = formData.get('name') as string;
  const color = formData.get('color') as string;
  
  await prisma.project.create({
    data: { name, color }
  });
  
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

// Renommer un projet
export async function renameProject(formData: FormData) {
  const id = Number(formData.get('id'));
  const name = formData.get('name') as string;
  
  await prisma.project.update({
    where: { id },
    data: { name }
  });
  
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

// Supprimer un projet
export async function deleteProject(formData: FormData) {
  const id = Number(formData.get('id'));
  
  await prisma.project.delete({
    where: { id }
  });
  
  revalidatePath('/dashboard');
  redirect('/dashboard');
}