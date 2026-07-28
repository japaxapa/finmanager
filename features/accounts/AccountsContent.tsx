'use client';

import {
  Grid,
  Paper,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
} from '@mui/material';
import AccountCard from './AccountCard';
import { ACCOUNTS_DATA } from './mock.data';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function AccountsContent() {
  {
    /* Accounts Cards Grid using your component */
  }

  return (
    <>
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {ACCOUNTS_DATA.map((account) => (
          <Grid size={{ xs: 12, md: 6 }} key={account.id}>
            <AccountCard
              institutionName={account.institutionName}
              accountName={account.accountName}
              balance={account.balance}
              brandColor={account.brandColor}
              onClick={() => console.log('Card clicked', account.id)}
              logo={account.logo}
            />
          </Grid>
        ))}
      </Grid>

      {/* Details Table Section */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: '#111827',
          border: '1px solid #1F2937',
          borderRadius: 3,
          p: 3,
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" color="#ffffff" sx={{ fontWeight: 700 }}>
            Detalhes das contas
          </Typography>
          <Typography variant="body2" color="#9CA3AF">
            Visão geral de todas as suas contas
          </Typography>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow
                sx={{
                  '& th': { borderBottom: '1px solid #1F2937', color: '#9CA3AF', fontWeight: 600 },
                }}
              >
                <TableCell>Conta</TableCell>
                <TableCell>Instituição</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell align="right">Saldo</TableCell>
                <TableCell align="right" width={50}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ACCOUNTS_DATA.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '& td, & th': { borderBottom: '1px solid #1F2937', color: '#E2E8F0' },
                  }}
                >
                  <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                    {row.accountName}
                  </TableCell>
                  <TableCell sx={{ color: '#9CA3AF' }}>{row.institutionName}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.type}
                      size="small"
                      sx={{
                        bgcolor: '#1E293B',
                        color: '#94A3B8',
                        borderRadius: 1.5,
                        fontSize: '0.75rem',
                      }}
                    />
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 600,
                      color: row.balance.startsWith('-') ? '#EF4444' : '#FFFFFF',
                    }}
                  >
                    {row.balance}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" sx={{ color: '#64748B' }}>
                      <MoreHorizIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
