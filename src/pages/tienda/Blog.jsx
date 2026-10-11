import { Link } from 'react-router-dom'
import { obtenerBlogs } from '../../data/blogs.js'

function Blog() {
  const blogs = obtenerBlogs()

  return (
    <section className="container py-4">
      <h1 className="h3 mb-4">Noticias importantes</h1>

      <div className="row g-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="col-12 col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h2 className="h5">{blog.titulo}</h2>
                <p className="text-muted">{blog.resumen}</p>
                <Link className="btn btn-outline-primary btn-sm mt-auto align-self-start" to={`/blog/${blog.id}`}>
                  Leer más
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Blog