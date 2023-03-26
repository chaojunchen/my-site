export default function (defaultData = null) {
    return {
        data: () => {
            return {
                isLoading: true,
                data: defaultData,
            }
        },
        async created () {
            const data = await this.fetchData();
            this.data = data;
            this.isLoading=false;
        }


    }
}