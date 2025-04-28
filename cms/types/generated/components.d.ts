import type { Schema, Struct } from '@strapi/strapi';

export interface OrderItem extends Struct.ComponentSchema {
  collectionName: 'components_order_items';
  info: {
    displayName: 'Item';
    icon: 'file';
  };
  attributes: {
    product: Schema.Attribute.Relation<'oneToOne', 'api::product.product'>;
    quantity: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'order.item': OrderItem;
    }
  }
}
