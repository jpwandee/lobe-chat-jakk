import { css, cx }
import { FC, ReactNode, memo }
import { Flexbox }containercss`height

padding-block: 0;
padding-inline: 8px;
`

interface innercontainerprops {
  bottomAddons?: reactnode;
  children: reactnode;
  expand?: boolean;
  textAreaLeftAddons?: reactnode;
  textAreaRightAddons?: reactnode;
  topAddons?: reactnode;
}

const InnerContainer: FC<InnerContainerProps> = memo(
  ({ children, expand, textAreaRightAddons, textAreaLeftAddons, bottomAddons, topAddons }) =>
  expand ? (
    <Flexbox className={cx(container)} gap={8}>
    <Flexbox gap={8} horizontal justify={'flex-end'}>
    {textAreaLeftAddons}
    {textAreaRightAddons}
    </Flexbox>
    {children}
    {topAddons}
    {bottomAddons}
    </Flexbox>
  ) : (
    <Flexbox align={'flex-end'} className={cx(container)} gap={8} horizontal>
    {textAreaLeftAddons}
    {children}
    {textAreaRightAddons}
    </Flexbox>
  ),
);InnerContainer

export default InnerContainer
