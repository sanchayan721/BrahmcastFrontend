import { AppBar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Logo from '../../assets/logo'
import './header.css'
import ThemedButton from '../Buttons/ThemedButton'
import { AppRegistrationRounded, LoginRounded } from '@mui/icons-material'
import DefaultLink from '../Link/DefaultLink'
import { useLocation } from 'react-router-dom'

const PublicHeader = () => {
	
	const location = useLocation();

	return (
		<AppBar
			position='fixed'
			elevation={0}
			className="header"
		>
			<Box
				padding={'2.5em 3em'}
				height={'6.3em'}
				width={'100%'}
				display={'flex'}
				alignItems={'center'}
				justifyContent={'space-between'}
			>
				<Logo />
				<Box
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					gap={'4em'}
				>
					<ul
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							gap: '1em'
						}}
					>
						<li>
							<DefaultLink
								to={'/'}
								text={
									<Typography>Jobs</Typography>
								}
							/>
						</li>
						<li>
							<DefaultLink
								to={'/studios'}
								text={
									<Typography>Studios</Typography>
								}
							/>
						</li>
						<li>
							<DefaultLink
								to={'/production'}
								text={
									<Typography>Production</Typography>
								}
							/>
						</li>
					</ul>
					<Box
						display={'flex'}
						justifyContent={'center'}
						alignItems={'center'}
						gap={'1em'}
						minWidth={'20em'}
					>
						<ThemedButton
							variant='contained'
							size='large'
							fullWidth
							endIcon={<AppRegistrationRounded />}
							disableElevation
							sx={{ fontSize: '0.85em' }}
							>
							Register
						</ThemedButton>
						<ThemedButton
							variant='contained'
							size='large'
							fullWidth
							endIcon={<LoginRounded />}
							disableElevation
							sx={{ fontSize: '0.85em' }}
						>
							Log In
						</ThemedButton>
					</Box>
				</Box>
			</Box>
		</AppBar >
	)
}

export default PublicHeader