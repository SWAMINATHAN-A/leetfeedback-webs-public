import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  .shadow__btn {
    padding: 10px 20px;
    border: none;
    font-size: 17px;
    color: #fff;
    border-radius: 7px;
    letter-spacing: 4px;
    font-weight: 700;
    text-transform: uppercase;
    transition: 0.5s;
    transition-property: box-shadow;
    background: rgb(0,140,255);
    box-shadow: 0 0 25px rgb(0,140,255);
  }

  .shadow__btn:hover {
    box-shadow: 0 0 5px rgb(0,140,255),
                0 0 25px rgb(0,140,255),
                0 0 50px rgb(0,140,255),
                0 0 100px rgb(0,140,255);
  }
`;

const ContactButton: React.FC = () => {
  return (
    <StyledWrapper>
      <a href="mailto:catinice@outlook.com">
        <button className="shadow__btn">
          Contact Us
        </button>
      </a>
    </StyledWrapper>
  );
};

export default ContactButton; 