import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import LocationForm from './LocationForm'
import './Admin.css'

export default function AdminDashboard() {
  const [tab, setTab] = useState('locations')
  const [locations, setLocations] = useState([])
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)

  const fetchLocations = async () => {
    const { data } = await supabase.from('locations').select('*').order('created_at', { ascending: false })
    setLocations(data ?? [])
    setLoading(false)
  }

  const fetchRequests = async () => {
    const { data } = await supabase.from('requests').select('*').order('created_at', { ascending: false })
    setRequests(data ?? [])
  }

  useEffect(() => { fetchLocations(); fetchRequests() }, [])
  useEffect(() => { if (tab === 'requests') fetchRequests() }, [tab])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const handleSave = async (form) => {
    if (modal.mode === 'add') {
      await supabase.from('locations').insert([form])
    } else {
      await supabase.from('locations').update(form).eq('id', modal.loc.id)
    }
    setModal(null)
    fetchLocations()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this location?')) return
    await supabase.from('locations').delete().eq('id', id)
    fetchLocations()
  }

  const handleDeleteRequest = async (id) => {
    if (!confirm('Delete this request?')) return
    await supabase.from('requests').delete().eq('id', id)
    fetchRequests()
  }

  const handleToggleActive = async (loc) => {
    await supabase.from('locations').update({ active: !loc.active }).eq('id', loc.id)
    fetchLocations()
  }

  return (
    <div className="admin-wrap">
      <div className="admin-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span className="admin-header__title">Hustle Vending</span>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <button
              className={`admin-btn ${tab === 'locations' ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
              onClick={() => setTab('locations')}
            >
              Locations
            </button>
            <button
              className={`admin-btn ${tab === 'requests' ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
              onClick={() => setTab('requests')}
            >
              Requests {requests.length > 0 && `(${requests.length})`}
            </button>
          </div>
        </div>
        <div className="admin-header__actions">
          {tab === 'locations' && (
            <button className="admin-btn admin-btn--primary" onClick={() => setModal({ mode: 'add' })}>
              + Add location
            </button>
          )}
          <button className="admin-btn admin-btn--ghost" onClick={handleSignOut}>Sign out</button>
        </div>
      </div>

      <div className="admin-body">
        {tab === 'locations' && (
          <>
            <p className="admin-section-title">{locations.length} location{locations.length !== 1 ? 's' : ''}</p>
            {loading ? (
              <p className="admin-empty">Loading…</p>
            ) : locations.length === 0 ? (
              <p className="admin-empty">No locations yet. Add your first one above.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Type</th>
                    <th>Hours</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {locations.map(loc => (
                    <tr key={loc.id}>
                      <td><strong>{loc.name}</strong></td>
                      <td>{loc.address}</td>
                      <td>{loc.type}</td>
                      <td>{loc.hours}</td>
                      <td>
                        <span
                          className={`admin-badge ${loc.active ? 'admin-badge--active' : 'admin-badge--inactive'}`}
                          style={{ cursor: 'pointer' }}
                          title="Click to toggle"
                          onClick={() => handleToggleActive(loc)}
                        >
                          {loc.active ? 'Active' : 'Hidden'}
                        </span>
                      </td>
                      <td>
                        <div className="admin-table__actions">
                          <button className="admin-btn admin-btn--ghost" onClick={() => setModal({ mode: 'edit', loc })}>Edit</button>
                          <button className="admin-btn admin-btn--danger" onClick={() => handleDelete(loc.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}

        {tab === 'requests' && (
          <>
            <p className="admin-section-title">{requests.length} request{requests.length !== 1 ? 's' : ''}</p>
            {requests.length === 0 ? (
              <p className="admin-empty">No requests yet. They'll appear here when customers submit them.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Location</th>
                    <th>Reason</th>
                    <th>From</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(req => (
                    <tr key={req.id}>
                      <td><strong>{req.item}</strong></td>
                      <td>{req.location}</td>
                      <td style={{ maxWidth: '200px', color: '#555' }}>{req.reason || '—'}</td>
                      <td>{req.name || req.email || <span style={{ color: '#aaa' }}>Anonymous</span>}</td>
                      <td style={{ whiteSpace: 'nowrap', color: '#888' }}>
                        {new Date(req.created_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td>
                        <button className="admin-btn admin-btn--danger" onClick={() => handleDeleteRequest(req.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>

      {modal && (
        <div className="admin-modal-overlay" onClick={e => { if (e.target === e.currentTarget) setModal(null) }}>
          <div className="admin-modal">
            <p className="admin-modal__title">{modal.mode === 'add' ? 'Add location' : 'Edit location'}</p>
            <LocationForm
              initial={modal.loc ?? undefined}
              onSave={handleSave}
              onCancel={() => setModal(null)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
