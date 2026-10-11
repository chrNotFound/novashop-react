import { Link, useParams } from 'react-router-dom'
import { obtenerBlogPorId } from '../../data/blogs.js'

function DetalleBlog() {
  const { id } = useParams()
  const blog = obtenerBlogPorId(id)

  if (!blog) {
    return (
      <section className="container py-5 text-center">
        <h1 className="h3 mb-3">Artículo no encontrado</h1>
        <Link className="btn btn-primary" to="/blog">
          Volver al blog
        </Link>
      </section>
    )
  }

  return (
    <section className="container py-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/blog">Blog</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {blog.titulo}
          </li>
        </ol>
      </nav>

      <article className="col-12 col-lg-8">
        <h1 className="h3 mb-3">{blog.titulo}</h1>
        {blog.contenido.map((parrafo, indice) => (
          <p key={indice}>{parrafo}</p>
        ))}
      </article>
    </section>
  )
}

export default DetalleBlog