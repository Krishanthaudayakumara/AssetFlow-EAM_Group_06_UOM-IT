import React from 'react'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

const ReportButton: React.FC = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-9" style={{ padding: '0 0 0 450px' }}>
            <Button
              variant="outline-primary"
              type="button"
              style={{
                backgroundColor: 'white',
                borderColor: '#331c7a',
                color: '#331c7a',
              }}
            >
              Export to Excel
            </Button>
          </div>
          <div className="col-3" style={{ padding: '0 0 0 0' }}>
            <Link to="/ReportHistory">
              <Button
                variant="outline-primary"
                type="button"
                style={{
                  backgroundColor: 'white',
                  borderColor: '#482890',
                  color: '#482890',
                }}
              >
                Report History
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportButton
