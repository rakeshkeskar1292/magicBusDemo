import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from '@mui/material'

const MOCK_CUSTOMERS = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', purchases: 12 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', purchases: 8 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive', purchases: 5 },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Active', purchases: 15 },
]

export default function CustomerTable() {
  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Recent Customers
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Purchases</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_CUSTOMERS.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  <Chip
                    label={customer.status}
                    color={customer.status === 'Active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">{customer.purchases}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
