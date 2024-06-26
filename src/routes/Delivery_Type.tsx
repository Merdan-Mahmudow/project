export enum DeliveryType {
    SELF_PICKUP,
    DELIVERY,
  }
  
  interface DeliveryOption {
    id: number;
    name: string;
    type: DeliveryType;
  }
  
  export const deliveryOptions: DeliveryOption[] = [
    { id: 1, name: 'Самовывоз', type: DeliveryType.SELF_PICKUP },
    { id: 2, name: 'Доставка', type: DeliveryType.DELIVERY },
  ];