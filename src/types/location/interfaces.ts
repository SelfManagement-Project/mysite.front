export interface MapMarker {
    position: {
        lat: number;
        lng: number;
    };
    content: string;
    category: string;
    address?: string;
    phone?: string;
}


export interface Place {
    place_name: string;
    address_name: string;
    category_group_name: string;
    phone: string;
    x: string;
    y: string;
}