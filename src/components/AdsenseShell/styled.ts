import styled from "@emotion/styled";

export const Aside = styled.aside`
  &:first-of-type {
    grid-area: first-aside;
  }
  &:last-of-type {
    grid-area: last-aside;
  }
`;
export const Section = styled.section`
  grid-area: section;
`;

export const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: "section" "first-aside" "last-aside";

  @media screen and (min-width: 1200px) {
    grid-template-columns: 336px 1fr 336px;
    grid-template-areas: "first-aside section last-aside";
  }
`;
