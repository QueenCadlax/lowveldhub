// Implementing breadcrumb navigation
function Breadcrumb({ category, subcategory }) {
  return (
    <nav>
      <Link to="/directory">Directory</Link> >
      <Link to={`/directory/${category}`}>{category}</Link> >
      {subcategory && <span>{subcategory}</span>}
    </nav>
  );
}

// Update the relevant components to include Breadcrumb
