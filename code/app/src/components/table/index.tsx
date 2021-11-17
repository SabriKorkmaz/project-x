import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import src from '../../assets/logo/Project-x-logos.jpeg';
function createData(
    image: string,
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return {image, name, calories, fat, carbs, protein};
}

const rows = [
    createData(src, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData(src, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData(src, 'Eclair', 262, 16.0, 24, 6.0),
    createData(src, 'Eclair', 262, 16.0, 24, 6.0),
    createData(src, 'Eclair', 262, 16.0, 24, 6.0),
    createData(src, 'Eclair', 262, 16.0, 24, 6.0),
    createData(src, 'Eclair', 262, 16.0, 24, 6.0),
];

export default function SearchResult() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell scope="row">
                                <img width="200px" src={row.image}/>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


