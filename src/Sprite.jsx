import sprite from './assets/svgsprite.svg?raw';

export default function Sprite() {
    return <div dangerouslySetInnerHTML={{ __html: sprite }} className="u-accessible-hide" />;
}