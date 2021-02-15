import { Link, LocationProvider } from '@reach/router';
import router from '@elementor/router';

import Utils from 'elementor-app/utils/utils.js';

import './inline-link.scss';

export default function InlineLink( props ) {
	const baseClassName = 'eps-inline-link',
		colorClassName = `${ baseClassName }--color-${ props.color }`,
		underlineClassName = 'none' !== props.underline ? `${ baseClassName }--underline-${ props.underline }` : '',
		italicClassName = props.italic ? `${ baseClassName }--italic` : '',
		classes = [
			baseClassName,
			colorClassName,
			underlineClassName,
			italicClassName,
			props.className,
		],
		className = Utils.arrayToClassName( classes ),
		getRouterLink = () => (
			<LocationProvider history={ router.appHistory }>
				<Link
					to={ props.url }
					className={ className }
				>
					{ props.children }
				</Link>
			</LocationProvider>
		),
		getExternalLink = () => (
			<a
				href={ props.url }
				target={ props.target }
				rel={ props.rel }
				className={ className }
			>
				{ props.children }
			</a>
		);

	return props.url.includes( 'http' ) ? getExternalLink() : getRouterLink();
}

InlineLink.propTypes = {
	className: PropTypes.string,
	children: PropTypes.string,
	url: PropTypes.string,
	target: PropTypes.string,
	rel: PropTypes.string,
	text: PropTypes.string,
	color: PropTypes.oneOf( [ 'primary', 'secondary', 'cta', 'link', 'disabled' ] ),
	underline: PropTypes.oneOf( [ 'none', 'hover', 'always' ] ),
	italic: PropTypes.bool,
};

InlineLink.defaultProps = {
	className: '',
	color: 'link',
	underline: 'always',
	target: '_blank',
	rel: 'noopener noreferrer',
};
