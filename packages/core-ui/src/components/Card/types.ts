import type { Prettify } from '../../utils/typeHelper'
import type {
  CardRootProps as PrimitiveCardRootProps,
  CardHeaderProps as PrimitiveCardHeaderProps,
  CardTitleProps as PrimitiveCardTitleProps,
  CardDescriptionProps as PrimitiveCardDescriptionProps,
  CardContentProps as PrimitiveCardContentProps,
  CardFooterProps as PrimitiveCardFooterProps,
} from '../primitives/card'

export type CardProps = Prettify<PrimitiveCardRootProps>
export type CardHeaderProps = Prettify<PrimitiveCardHeaderProps>
export type CardTitleProps = Prettify<PrimitiveCardTitleProps>
export type CardDescriptionProps = Prettify<PrimitiveCardDescriptionProps>
export type CardContentProps = Prettify<PrimitiveCardContentProps>
export type CardFooterProps = Prettify<PrimitiveCardFooterProps>
