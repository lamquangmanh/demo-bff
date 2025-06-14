import { Field, ObjectType } from '@nestjs/graphql';

// import from common
import { returnString } from '@/common/utils';

@ObjectType()
class SubMenu {
  @Field(returnString, { nullable: false })
  name!: string;

  @Field(returnString, { nullable: false })
  url!: string;
}

@ObjectType()
class Menu {
  @Field(returnString, { nullable: false })
  name!: string;

  @Field(returnString, { nullable: true })
  url?: string;

  @Field(returnString, { nullable: true })
  icon?: string;

  @Field(() => [SubMenu], {
    nullable: false,
  })
  subMenus!: SubMenu[];
}

@ObjectType()
class SuperMenu {
  @Field(returnString, { nullable: false })
  name!: string;

  @Field(returnString, {
    nullable: true,
  })
  description?: string;

  @Field(returnString, { nullable: false })
  url!: string;

  @Field(returnString, { nullable: true })
  icon?: string;

  @Field(() => [Menu], { nullable: false })
  menus!: Menu[];
}

@ObjectType({ description: 'Get list' })
export class GetSuperMenusResponse {
  @Field(() => [SuperMenu])
  superMenus!: SuperMenu[];
}
