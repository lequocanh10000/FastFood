import { BooleanNotRequired, NumberNotRequired, StringNotRequired } from "src/common/decorators";

export class FilterProductDto {
    @StringNotRequired
    search?: string;

    @BooleanNotRequired
    isActive?: boolean;

    @BooleanNotRequired
    isFeatured?: boolean;

    @NumberNotRequired
    categoryId?: number;

    @NumberNotRequired
    page?: number;

    @NumberNotRequired
    limit?: number;

    @StringNotRequired
    sortBy?: string;

    @StringNotRequired
    sortOrder?: string;

    @NumberNotRequired
    minPrice?: number;

    @NumberNotRequired
    maxPrice?: number;
}