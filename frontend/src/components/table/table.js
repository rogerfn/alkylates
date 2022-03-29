import React, { useState, useEffect, lazy } from 'react'
import axios from 'axios'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'

export default function BasicTable({ datatable }) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow style={{ backgroundColor: '#4f5d73' }}>
            <TableCell
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontFamily:
                  'font-family: Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
                width: '16.7%',
              }}
              align="center"
            >
              Order Number
            </TableCell>
            <TableCell
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontFamily:
                  'font-family: Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
                width: '16.7%',
              }}
              align="center"
            >
              Delivery
            </TableCell>
            <TableCell
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontFamily:
                  'font-family: Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
                width: '16.7%',
              }}
              align="center"
            >
              Customer
            </TableCell>
            <TableCell
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontFamily:
                  'font-family: Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
                width: '16.7%',
              }}
              align="center"
            >
              Initial Date Scheduled
            </TableCell>
            <TableCell
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontFamily:
                  'font-family: Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
                width: '16.7%',
              }}
              align="center"
            >
              New Date Scheduled
            </TableCell>
            <TableCell
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontFamily:
                  'font-family: Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
                width: '16.7%',
                wordSpacing: '30000px',
              }}
              align="center"
            >
              Reason
            </TableCell>
            <TableCell
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontFamily:
                  'font-family: Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
                width: '16.7%',
              }}
              align="center"
            >
              Comments
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datatable
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((datatable) => (
              <TableRow
                key={datatable.order}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  style={{
                    textAlign: 'center',
                    fontFamily:
                      'font-family: Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
                    width: '16.7%',
                  }}
                  component="th"
                  scope="row"
                >
                  {datatable.order}
                </TableCell>
                <TableCell
                  style={{
                    textAlign: 'center',
                    fontFamily:
                      'font-family: Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
                    width: '16.7%',
                  }}
                  component="th"
                  scope="row"
                >
                  {datatable.bol_or_railcar}
                </TableCell>
                <TableCell
                  style={{
                    textAlign: 'center',
                    fontFamily:
                      'font-family: Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
                    width: '16.7%',
                  }}
                  component="th"
                  scope="row"
                >
                  {datatable.customer}
                </TableCell>
                <TableCell
                  style={{
                    textAlign: 'center',
                    fontFamily:
                      'font-family: Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
                    width: '16.7%',
                  }}
                  align="right"
                >
                  {datatable.sch}
                </TableCell>
                <TableCell
                  style={{
                    textAlign: 'center',
                    fontFamily:
                      'font-family: Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
                    width: '16.7%',
                  }}
                  align="right"
                >
                  {datatable.est}
                </TableCell>
                <TableCell
                  style={{
                    textAlign: 'center',
                    fontFamily:
                      'font-family: Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
                    width: '16.7%',
                  }}
                  align="right"
                >
                  {datatable.reason}
                </TableCell>
                <TableCell
                  style={{
                    textAlign: 'center',
                    fontFamily:
                      'font-family: Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
                    width: '16.7%',
                  }}
                  align="right"
                >
                  {datatable.comments}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              count={datatable.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
