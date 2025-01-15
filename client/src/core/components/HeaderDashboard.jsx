export default function HeaderDashboard() {
  return (
    <header>
      <nav className="flex items-center justify-center py-4">
        <ul className="flex gap-4">
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/centers">Centers</a>
          </li>
          <li>
            <a href="/events">Events</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
