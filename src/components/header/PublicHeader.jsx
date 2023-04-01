import { AppBar, Card, Tab, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useMemo, useState } from 'react'
import Logo from '../../assets/logo'
import DefaultLink from '../Link/DefaultLink'
import { formTypes } from '../../utils/formTypes'
import ThemedTabs from '../ThemedTabs/ThemedTabs'
import { headerLinks } from '../../utils/headerLinks'
import { colors } from '../theme/style'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentAuthStep, setActiveAuthStep } from '../../features/auth/authNavigationSlice'
import isElementInViewport from '../../utils/checkElementInViewPort'
import './header.css'
import zIndex from '@mui/material/styles/zIndex'

const PublicHeader = () => {

	const location = useLocation();
	const currentPath = useMemo(() => location.pathname, [location])

	/* Initial states just after render */
	const currentAuthStep = useSelector(selectCurrentAuthStep);
	const [value, setValue] = useState(currentAuthStep);
	useEffect(() => {
		setValue(currentAuthStep)
	},
		[currentAuthStep]
	);


	const handleAuthNavClick = (event) => {
		event.preventDefault();
		const authFormSwiper = document.getElementById('auth__form-swiper');
		if (!isElementInViewport(authFormSwiper)) {
			authFormSwiper.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
		};
	};

	/* Handeling the change in toggle state */
	const dispatch = useDispatch();
	const handleChange = (_event, newValue) => {
		setValue(newValue);
		dispatch(setActiveAuthStep({ activeStep: newValue }));
	};

	return (
		<AppBar
			position='fixed'
			elevation={0}
			className="header"
			style={{zIndex: 100}}
		>
			<Box
				padding={'2.5em 3em'}
				height={'6.3em'}
				width={'100%'}
				display={'flex'}
				alignItems={'center'}
				justifyContent={'space-between'}
				gap={'4.25em'}
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
						{
							headerLinks.map((headerLink, index) => {
								return (
									<li key={index}>
										<DefaultLink
											to={headerLink.link}
											text={
												<Typography
													lineHeight={'1em'}
													fontWeight={'medium'}
													color={headerLink.link === currentPath ? colors.text__color : colors.muted}
												>
													{headerLink.name}
												</Typography>
											}
										/>
									</li>
								)
							})
						}
					</ul>

					<ThemedTabs
						value={value}
						onChange={handleChange}
						onClick={handleAuthNavClick}
						ariaLabel={'login/register toggler'}
					>
						{
							formTypes.map((formType, index) => {
								return (
									<Tab
										key={index}
										icon={formType.icon}
										iconPosition='end'
										value={formType.name}
										label={
											<Typography fontSize={'1.2em'} fontWeight={'regular'} variant='body1' className='button__label'>
												{formType.name}
											</Typography>
										}
									/>
								)
							})
						}
					</ThemedTabs>
				</Box>
			</Box>
		</AppBar >
	)
}

export default PublicHeader