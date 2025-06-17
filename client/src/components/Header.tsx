import { Link, useRouter } from '@tanstack/react-router'

export default function Header() {
  const { state } = useRouter()

  return (
    <header className="mb-5">
      <div className="columns is-vcentered is-mobile">
        <div className="column is-4">
          <input
            type="text"
            placeholder="Search..."
            className="input is-small"
            style={{ width: '100%' }}
          />
        </div>

        <div className="column is-4 has-text-centered">
          <span className="is-size-7 has-text-grey">{}</span>
        </div>

        <div className="column is-4 has-text-right">
          <button className="button is-primary is-small mr-2">Add New Task</button>
          <Link to="/projects/3/backlog" className="is-size-7 has-text-link">
            View Backlog
          </Link>
        </div>
      </div>
      <hr />
    </header>
  )
}
