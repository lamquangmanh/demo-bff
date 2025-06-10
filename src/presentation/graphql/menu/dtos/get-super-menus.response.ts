import { Field, ObjectType } from '@nestjs/graphql';

// import from common
import { returnString } from '@/common/utils';

@ObjectType()
class SubMenu {
  @Field(returnString, { nullable: false })
  actionId!: string;

  @Field(returnString, { nullable: false })
  name!: string;

  @Field(returnString, { nullable: false })
  requestType!: string;

  @Field(returnString, { nullable: false })
  url!: string;

  @Field(returnString, { nullable: false })
  method!: string;
}

@ObjectType()
class Menu {
  @Field(returnString, { description: 'Unique identifier for the super menu' })
  resourceId!: string;

  @Field(returnString, { description: 'Name of the super menu' })
  name!: string;

  @Field(returnString, { description: 'URL of the super menu icon' })
  url!: string;

  @Field(() => [SubMenu], {
    nullable: false,
    description: 'List of sub-menus under the menu',
  })
  subMenus!: SubMenu[];
}

@ObjectType()
class SuperMenu {
  @Field(returnString, { nullable: false })
  moduleId!: string;

  @Field(returnString, { nullable: false })
  name!: string;

  @Field(returnString, {
    nullable: true,
  })
  description?: string;

  @Field(returnString, { nullable: true })
  url?: string;

  @Field(() => [Menu], { nullable: false })
  menus!: Menu[];
}

@ObjectType({ description: 'Get list' })
export class GetSuperMenusResponse {
  @Field(() => [SuperMenu])
  superMenus!: SuperMenu[];
}
