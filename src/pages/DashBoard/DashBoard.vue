<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card class="w-full q-py-sm">
          <q-item>
            <q-item-section>
              <q-icon :onclick="resetList" name="restart_alt" class="absolute-right q-mx-sm q-mt-sm" size="md"/>
              <q-item-label class="text-center text-h4 text-uppercase"><strong>Vùng nuôi</strong></q-item-label>
              <q-item-label class="text-center" caption>
                Số lượng
                <q-badge color="green">{{listData.length}}</q-badge>
              </q-item-label>
              <q-item-section>
                <q-input borderless label="Tìm kiếm chủ vùng nuôi" :onchange="onChangeValue" input-class="text-left" class="q-ml-md">
                  <template v-slot:prepend>
                    <q-icon name="search"/>
                  </template>
                </q-input>
              </q-item-section>
            </q-item-section>
          </q-item>
        </q-card>
      </div>

      <div class="col-12" v-for="(p, index) in filterData" :key="index">
        <q-card class="w-full q-py-sm">
          <q-item>
            <q-item-section avatar>
              <q-avatar square>
                <img src="~assets/avatar.svg"/>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label><strong>{{p.area_owner}}</strong></q-item-label>
              <q-item-label caption>Chủ vùng nuôi</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-btn color="light-blue-8" label="Xem" class="q-px-md"/>
            </q-item-section>
          </q-item>
          <q-separator/>
          <q-item>
            <q-item-section>
              <q-item-label class="text-center"><strong>{{p.adopt_types.name}}</strong></q-item-label>
              <q-item-label class="text-center" caption>Loại vùng nuôi</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-center"><strong>{{p.area_code}}</strong></q-item-label>
              <q-item-label class="text-center" caption>Mã vùng nuôi</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-center"><strong>8</strong></q-item-label>
              <q-item-label class="text-center" caption>Tổng ao/bể</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </div>

    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from 'vue'
import adoptFishApi from "src/Api/Store/adoptFishApi";

export default defineComponent({
  setup(){
    const listData = ref([])
    const filterData = ref([])
    const getData = async function(){
      const data = await adoptFishApi.getAdoptFish()
      listData.value = data
      filterData.value = data
    }

    onMounted(()=>{
      getData()
    })

    const resetList = function () {
      filterData.value = listData.value
    }

    const searchValue = ref('')
    const onChangeValue = function (e) {
      searchValue.value = e.target.value
    }
    watch(searchValue, (newValue)=>{
      if(newValue){
        const search = newValue.replace(/\\/g, "\\\\")
        const code = listData.value.filter((item) => {
          return item.area_owner.toLowerCase().match(search.toLowerCase())
        })
        filterData.value = code
      } else filterData.value = listData.value
    })

    return {
      listData,
      filterData,
      searchValue,
      onChangeValue,
      resetList
    }
  }
})
</script>
