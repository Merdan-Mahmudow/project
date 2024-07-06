// export enum DeliveryImage{
   
// }
export enum DeliveryType {
    SELF_PICKUP,
    DELIVERY,
  }
  
  interface DeliveryOption {
    id: number;
    name: string;
    type: DeliveryType;
    // image: DeliveryImage
  }
  
  export const deliveryOptions: DeliveryOption[] = [
    { id: 1, name: 'На вынос', type: DeliveryType.SELF_PICKUP },
    { id: 2, name: 'Доставка', type: DeliveryType.DELIVERY },
  ];