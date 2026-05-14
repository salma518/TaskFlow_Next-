import AddProjectForm from './AddProjectForm';
import { deleteProject, renameProject } from '../actions/projects';

interface Project {
  id: string;
  name: string;
  color: string;
}

export default async function DashboardPage() {
  const res = await fetch('http://localhost:4000/projects', { cache: 'no-store' });
  const projects: Project[] = await res.json();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <AddProjectForm />

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {projects.map((p) => (
          <li
            key={p.id}
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            {/* Cercle de couleur */}
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: p.color,
                display: 'inline-block',
              }}
            />

            {/* Lien vers le projet */}
            <a href={`/projects/${p.id}`} style={{ flex: 1 }}>
              {p.name}
            </a>

            {/* Formulaire RENAME */}
            <form action={renameProject} style={{ display: 'inline' }}>
              <input type="hidden" name="id" value={p.id} />
              <input
                type="text"
                name="newName"
                placeholder="Nouveau nom"
                size={15}
                style={{
                  padding: '4px 8px',
                  borderRadius: 4,
                  border: '1px solid #ccc',
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  padding: '4px 8px',
                  cursor: 'pointer',
                  marginLeft: 4,
                }}
              >
                Renommer
              </button>
            </form>

            {/* Formulaire DELETE */}
            <form action={deleteProject} style={{ display: 'inline' }}>
              <input type="hidden" name="id" value={p.id} />
              <button
                type="submit"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#e74c3c',
                  fontSize: '1.2rem',
                }}
              >
                ❌
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}