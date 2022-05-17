<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-btn-dropdown
          class="full-width"
          split
        >
          <template v-slot:label>
            <q-item>
              <q-item-section>
                <q-item-label class="text-center text-h4 text-uppercase"><strong>Vùng nuôi</strong></q-item-label>
                <q-item-label class="text-center" caption>
                  Số lượng
                  <q-badge color="green">{{listDataAdopt.length}}</q-badge>
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>

          <q-list>
            <q-card class="w-full q-py-sm" v-for="(p, index) in listDataAdopt" :key="index">
              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <q-avatar square>
                    <img src="~assets/pond.jpg"/>
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
          </q-list>
        </q-btn-dropdown>
      </div>
      <div class="col-12">
        <q-card class="w-full q-py-sm">
          <q-item>
            <q-item-section>
              <q-icon :onclick="resetList" name="restart_alt" class="absolute-right q-mx-sm q-mt-sm" size="md"/>
              <q-item-label class="text-center text-h4 text-uppercase"><strong>Ao/Bể</strong></q-item-label>
              <q-item-label class="text-center" caption>
                Số lượng
                <q-badge color="green">{{filterDataPond.length}}</q-badge>
              </q-item-label>
              <q-item-section>
                <q-input borderless label="Tìm kiếm mã ao/bể" :onchange="onChangeValue" input-class="text-left" class="q-ml-md">
                  <template v-slot:prepend>
                    <q-icon name="search"/>
                  </template>
                </q-input>
              </q-item-section>
            </q-item-section>
          </q-item>
        </q-card>
      </div>

      <div class="col-12" v-for="(p, index) in filterDataPond" :key="index">
        <q-card class="w-full q-py-sm">
          <q-item>
            <q-item-section>
              <q-item-label><strong>{{p.code}}</strong></q-item-label>
              <q-item-label caption>Mã ao/bể</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-btn color="light-blue-8" label="Xem" class="q-px-md" @click="btnLink(p.id)"/>
            </q-item-section>
          </q-item>
          <q-separator/>
          <q-item>
            <q-item-section>
              <q-item-label class="text-center"><strong>{{p.pond_categorizes.name}}</strong></q-item-label>
              <q-item-label class="text-center" caption>Loại ao/bể</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-center"><strong>{{p.area}}</strong></q-item-label>
              <q-item-label class="text-center" caption>Diện tích</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-center"><strong>{{p.location}}</strong></q-item-label>
              <q-item-label class="text-center" caption>Vị trí</q-item-label>
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
import pondApi from "src/Api/Store/pondApi";
import {useRouter} from "vue-router";

export default defineComponent({
  setup(){
    const router = useRouter()

    const listDataAdopt = ref([])
    const listDataPond = ref([])
    const filterDataPond = ref([])
    const getData = async function(){
      const dataPond = await pondApi.getAllPonds()
      const dataAdopt = await adoptFishApi.getAdoptFish()
      listDataAdopt.value = dataAdopt
      listDataPond.value = dataPond
      filterDataPond.value = dataPond
    }

    onMounted(()=>{
      getData()
      if(localStorage.getItem('pond_detail_id')){
        localStorage.removeItem('pond_detail_id')
      }
    })

    const resetList = function () {
      filterDataPond.value = listDataPond.value
    }

    const searchValue = ref('')
    const onChangeValue = function (e) {
      searchValue.value = e.target.value
    }
    watch(searchValue, (newValue)=>{
      if(newValue){
        const search = newValue.replace(/\\/g, "\\\\")
        const code = listDataPond.value.filter((item) => {
          return item.code.toLowerCase().match(search.toLowerCase())
        })
        filterDataPond.value = code
      } else filterDataPond.value = listDataPond.value
    })

    const btnLink = function (id) {
      localStorage.setItem('pond_detail_id', id)
      router.push({ path: '/pond-detail' })
    }

    return {
      listDataAdopt,
      listDataPond,
      filterDataPond,
      searchValue,
      onChangeValue,
      btnLink,
      resetList
    }
  }
})
</script>
