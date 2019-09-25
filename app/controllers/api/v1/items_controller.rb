class Api::V1::ItemsController < Api::V1::BaseController

    def item_params
        params.require(:item).permit(:id, :name, :description)
    end
end