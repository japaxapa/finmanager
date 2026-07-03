'use client';

import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import PageContainer from '@/shared/components/PageContainer';
import CardContent from '@mui/material/CardContent';
import { useCategories } from '@/shared/hooks/useCategories';
import CategoryChip from '@/features/categories/CategoryChip';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Backdrop from '@mui/material/Backdrop';
import { useState } from 'react';
import { CreateCategoryForm } from '@/features/categories/CreateCategoryForm';
import Grid from '@mui/material/Grid';

// TODO create a getter for the Categories based on type
// TODO create create for the Categories

export default function Categories() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const { data: incomeCategories, isLoading: isLoadingIncome } = useCategories('income');

  return (
    <PageContainer className="flex, flex-col justify-start">
      <Paper sx={{ width: '100%', minHeight: '100vh' }}>
        <Paper
          elevation={4}
          sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4, px: 2 }}
        >
          <Card sx={{ px: 2 }} variant="outlined">
            <CardHeader title={'Income'} />
            <CardContent sx={{ minHeight: '20vh' }}>
              {isLoadingIncome && <Skeleton variant="rectangular" height={100} />}
              {incomeCategories && (
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 6, md: 9 }}>
                  {incomeCategories?.data?.map((cat) => (
                    <Grid key={cat.id}>
                      <CategoryChip title={cat.name} />
                    </Grid>
                  ))}
                </Grid>
              )}
              {!incomeCategories?.data?.length && !isLoadingIncome && (
                <Typography>No income categories</Typography>
              )}
            </CardContent>
          </Card>

          <Card sx={{ px: 2 }} variant="outlined">
            <CardHeader title={'Expense'} />
            <CardContent sx={{ minHeight: '20vh' }}></CardContent>
          </Card>
        </Paper>

        <Backdrop
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
          open={open}
          onClick={handleClose}
        >
          <Paper elevation={8} sx={{ position: 'relative' }}>
            <CreateCategoryForm handleClose={handleClose} onClick={(e) => e.stopPropagation()} />
          </Paper>
        </Backdrop>
      </Paper>
      <Fab
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        aria-label="create category"
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
    </PageContainer>
  );
}
