import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStockBarcodes } from '../../../api/stockApi';
import { Row, Col, Button } from 'react-bootstrap';
import Barcode from 'react-barcode';
import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';

const StockBarcodesPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [barcodes, setBarcodes] = useState<any[]>([]);
  const componentRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchBarcodes();
    }
  }, [id]);

  const fetchBarcodes = async () => {
    try {
      const response = await getStockBarcodes(parseInt(id!, 10));
      setBarcodes(response.data);
    } catch (error) {
      console.error('Error fetching barcodes:', error);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Stock Barcodes',
    onAfterPrint: () => {
      // Convert the printed page to PDF
      const element = componentRef.current;
      const options = {
        filename: 'stock_barcodes.pdf',
        jsPDF: {
          format: 'A4',
          margins: {
            top: 40,
            bottom: 40,
            left: 40,
            right: 40,
          },
        },
      };
      html2pdf().set(options).from(element).save();
    },
  });

  const handleGoBack = () => {
    navigate('/stock'); // Replace '/stock' with the appropriate URL of your stock page
  };

  return (
    <div>
      <h1>Stock Barcodes Page</h1>
      <Button variant="primary" onClick={handlePrint}>
        Print Page as PDF
      </Button>
      <Button variant="secondary" onClick={handleGoBack}>
        Back to Stock
      </Button>
      <div ref={componentRef}>
        <Row>
          {barcodes.map((barcode) => (
            <Col key={barcode.id} md={3} sm={6}>
              <Barcode value={barcode.barcode} width={1} height={30} fontSize={12} />
              <p>
                {barcode.name} - {barcode.id}
              </p>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default StockBarcodesPage;
