import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  products: state.products?.items || [],
  loading: state.products?.loading || false,
  error: state.products?.error || null,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch({ type: 'PRODUCTS_FETCH_REQUEST' }),
  removeProduct: (id) => dispatch({ type: 'PRODUCT_DELETE_REQUEST', payload: id }),
});

function AdminProductList({ products, loading, error, fetchProducts, removeProduct }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filtered = useMemo(() => {
    if (!query) return products;
    const q = query.toLowerCase();
    return products.filter((p) => (p.name || '').toLowerCase().includes(q));
  }, [products, query]);

  return (
    <div>
      <h2>Admin - Product List</h2>
      <input
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: 12, padding: 6, width: '100%' }}
      />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{`Error: ${error}`}</div>
      ) : (
        <ul>
          {filtered.map((p) => (
            <li key={p.id || p._id || p.name}>
              <span>{p.name || 'Unnamed'}</span>
              <button onClick={() => removeProduct(p.id || p._id)} style={{ marginLeft: 8 }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductList);