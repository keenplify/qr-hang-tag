import styled, { keyframes } from 'styled-components';
import Popup from 'reactjs-popup';

const SlideIn = keyframes`
    100% { transform: translateX(0%); }
`
const CustomPopup = styled(Popup)`
  // use your custom style for ".popup-overlay"
  &-overlay {
    ...;
  }
  // use your custom style for ".popup-content"
  &-content {
    ...;
    width: 30%;
    margin: .5em 0;
    padding: 2% 1%;
    border: none;
    color: black;
    border-radius: 1em;
    animation: ${SlideIn} 0.5s forwards;
    transform: translateX(-100%);
    box-shadow: .5em .5em .5em rgba(0,0,0,.5);

    @media (max-width: 992px) {
        width: 90%
    }

    @media (prefers-color-scheme: dark) {
        background: #232526;
        background: -webkit-linear-gradient(to right, #414345, #232526);
        background: linear-gradient(to right, #414345, #232526);
        color: white;
    }
  }
`;

export default CustomPopup