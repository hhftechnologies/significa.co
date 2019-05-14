import styled, { media } from '@theme'

import { Container, Text as BaseText } from '../../UI'

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-top: 1px solid;
  padding-bottom: 7.5em;

  ${media.small} {
    padding-bottom: 2em;
  }
`

export const Text = styled(BaseText)`
  margin-bottom: 1em;
`

export const Gallery = styled(Container)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5em;

  ${media.large} {
    grid-gap: 3em;
  }

  ${media.medium} {
    grid-gap: 1.5em;
    grid-template-columns: repeat(2, 1fr);
  }
`

export const ImgHolder = styled.div`
  ${media.medium} {
    &:last-child {
      display: none;
    }
  }
`
