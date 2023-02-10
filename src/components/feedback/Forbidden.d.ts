export interface ForbiddenProps {
  /**
   * @default "Nu aveti permisiuni sa vizualizati aceasta pagina!"
   * Text to be displayed
   */
  forbiddenText?: string
  /**
   * @default "Logare"
   * Text to be displayed on button
   */
  forbiddenButtonText?: string
}

/**
 * Demos:
 *
 * - https://bit.cloud/totalsoft_oss/rocket-ui/components/feedback/forbidden
 *
 *  Take a look over the code for further information: https://github.com/osstotalsoft/rocket-ui/tree/main/rocket-ui/components/feedback/forbidden
 */

export default function Forbidden(props: ForbiddenProps): JSX.Element
