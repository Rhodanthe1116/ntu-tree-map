import React, { useState, useEffect } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme'

// style
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

// components 
import Box from '@material-ui/core/Box'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

// my components
import TreeMap from './components/TreeMap';
import FloatingNavgationBar from './components/FloatingNavgationBar'
import TreeDetailDrawer from './components/TreeDetailDrawer'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		width: '100vw',
		height: '100vh',
	},
	main: {
		width: '100%',
		height: '100%',
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	}
}));

const ntuLocation = {
	center: {
		lat: 25.017319,
		lng: 121.538977
	},
	zoom: 16,
}

function App() {
	const classes = useStyles()
	const [drawerOpen, setDrawerOpen] = useState(false)
	const [selectedTree, setSelectedTree] = useState(null)

	const [trees, setTrees] = useState([])
	const [filter, setFilter] = useState({ type: "all", value: "on" })
	const [error, setError] = useState(null)
	useEffect(() => {
		setTrees([])

		const proxyurl = "https://damp-cliffs-64400.herokuapp.com/";

		fetch(proxyurl + 'https://map.ntu.edu.tw/ntutree/permitAll/treeDb/listAll')
			.then(response => {
				if (response.ok) {
					return response.json()
				} else {
					throw new Error('get trees failed')
				}
			})
			.then((jsonResponse) => {
				let newTrees = jsonResponse.rows

				if (filter.type !== 'all' && filter.type !== 'area') {
					newTrees = newTrees.filter(tree => {
						if (tree[filter.type] === filter.value) {
							return true
						}
						return false
					})
				}
				newTrees = newTrees.slice(0, 50)

				newTrees.forEach((tree) => {
					tree.lat = ntuLocation.center.lat + (Math.random() - 0.5) * 0.01
					tree.lng = ntuLocation.center.lng + (Math.random() - 0.5) * 0.01
				});
				setTrees(newTrees)
			})
			.catch(error => {
				setError(error.toString())
			})
	}, [filter])

	function openTreeDetail(tree) {
		setDrawerOpen(true)
		setSelectedTree(tree)
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box className={classes.root}>
				{/* <TreeAppBar /> */}
				<Box className={classes.main} component="main">
					<FloatingNavgationBar
						filter={filter}
						onFilterChange={(newFilter) => setFilter(newFilter)} />
					<TreeMap
						onLearnMoreClick={openTreeDetail}
						trees={trees}
					/>
					<TreeDetailDrawer
						open={drawerOpen}
						onClose={() => setDrawerOpen(false)}
						tree={selectedTree}
					/>
				</Box>
			</Box>
			<Backdrop className={classes.backdrop} open={trees.length === 0}>
				<CircularProgress color="primary" />
			</Backdrop>
			<Snackbar open={error} autoHideDuration={4000} onClose={() => setError(null)}>
				<Alert onClose={() => setError(null)} severity="error">
					{error}
				</Alert>
			</Snackbar>
		</ThemeProvider>

	)
}

export default App;
