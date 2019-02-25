import styled, { css } from '@theme'

import PaddedWrapper from '../common/PaddedWrapper'

import { Title as BaseTitle } from '../../../../UI'

export const Wrapper = styled(PaddedWrapper)<{ inverted?: boolean }>`
  margin: 0 -1.5em;

  display: flex;
  flex-direction: ${p => (p.inverted ? 'row-reverse' : 'row')};
  justify-content: space-between;

  @media (max-width: 48em) {
    flex-direction: column;
    align-items: center;
    margin: -1.5em 0;
  }

  @media (max-width: 32em) {
    display: block;
    margin: 0;
  }
`

export const TextContainer = styled.div`
  padding: 3em 0;
  margin: 0 1.5em;

  max-width: 47%;
  width: 100%;

  @media (max-width: 48em) {
    padding: 0;
    max-width: 75%;
    min-width: 20em;
    margin: 1.5em 0;
  }

  @media (max-width: 32em) {
    max-width: 100%;
  }
`

export const TextSticky = styled.div<{ sticky?: boolean }>`
  ${p =>
    p.sticky &&
    css`
      position: sticky;
      top: 3em;
    `}
`

export const MediaContainer = styled.div`
  margin: 0 1.5em;

  max-width: 37%;
  width: 100%;

  @media (max-width: 48em) {
    max-width: 50%;
    min-width: 20em;
    margin: 1.5em 0;
  }

  @media (max-width: 32em) {
    max-width: 100%;
  }
`

export const Title = styled(BaseTitle)`
  margin-bottom: 0.5rem;
`
