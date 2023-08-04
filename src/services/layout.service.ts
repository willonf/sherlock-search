export class LayoutService {

  private containerFlex(columnOrRow?: string, justifyContent?: string, alignItems?: string) {
    let nameClass = [`flex`, `flex-${columnOrRow}`];
    if (justifyContent) nameClass.push(`justify-content-${justifyContent}`);
    if (alignItems) nameClass.push(`align-items-${alignItems}`);
    return nameClass;
  }

  public flexLayout(value: string = 'row') {
    return this.containerFlex(...value.split('-'));
  }
}
