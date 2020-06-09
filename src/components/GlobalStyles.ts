import styled from 'styled-components/native';

interface MarginProps {
  margin: number;
}

export const HorizontalMargin = styled.View<MarginProps>`
  margin: 0px ${(props) => props.margin}px 0px ${(props) => props.margin}px;
`;

export const VerticalMargin = styled.View<MarginProps>`
  margin: ${(props) => props.margin}px 0px ${(props) => props.margin}px 0px;
`;
