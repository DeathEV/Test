<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card class="w-full q-py-sm">
          <q-item>
            <q-item-section>
              <q-icon @click="btnBack" name="arrow_back_ios" class="absolute-right q-mx-sm q-mt-sm" size="md"/>
              <q-item-label class="text-center text-h4 text-uppercase"><strong>{{dataDetail.code}}</strong></q-item-label>
              <q-item-label class="text-center" caption>
                Mã ao/bể
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </div>

      <div class="col-12">
        <q-btn-dropdown
          class="full-width"
          split
        >
          <template v-slot:label>
            <q-item>
              <q-item-section>
                <q-item-label class="text-center text-h5 text-uppercase"><strong>Hình ảnh</strong></q-item-label>
                <q-item-label class="text-center" caption>
                  Số lượng
                  <q-badge color="green">{{imgList.length || 0}}</q-badge>
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>

          <q-list>
            <q-card clickable v-close-popup v-for="(p, index) in imgList" :key="index">
              <q-img
                class="q-my-sm"
                :src="p.pond_images.file_url"
                spinner-color="white"
                style="height: 140px; max-width: 150px"
              />
            </q-card>
          </q-list>
        </q-btn-dropdown>
      </div>

      <div class="col-12">
        <q-card class="w-full q-py-sm">
          <q-item>
            <q-item-section>
              <q-item-label class="text-center text-h5 text-uppercase"><strong>Thông tin ao/bể</strong></q-item-label>
            </q-item-section>
          </q-item>
          <q-separator/>
          <q-item>
            <q-item-section>
              <q-item-label class="text-center"><strong>{{pondType.name}}</strong></q-item-label>
              <q-item-label class="text-center" caption>Loại ao/bể</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-center"><strong>{{dataDetail.area}}</strong></q-item-label>
              <q-item-label class="text-center" caption>Diện tích</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-center"><strong>{{dataDetail.location}}</strong></q-item-label>
              <q-item-label class="text-center" caption>Vị trí</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-center"><strong>{{dataDetail.status == true ? 'Có thể sử dụng' : 'Không thể sử dụng'}}</strong></q-item-label>
              <q-item-label class="text-center" caption>Trạng thái</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator/>
          <q-item>
            <q-item-section>
              <q-item-label class="text-center text-uppercase">
                <strong>{{moment(dataDetail.finished_date).utc().format('DD/MM/YYYY')}}</strong>
              </q-item-label>
              <q-item-label class="text-center" caption>
                Ngày hoàn thành
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator/>
          <q-item>
            <q-item-section>
              <q-item-label class="text-center"><strong>{{adoptDetail.area_owner}}</strong></q-item-label>
              <q-item-label class="text-center" caption>Chủ vùng nuôi</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-center">
                <strong>
                  {{adoptDetail.address+', '+address3Detail.name+', '+address2Detail.name+', '+address1Detail.name}}
                </strong>
              </q-item-label>
              <q-item-label class="text-center" caption>Địa chỉ</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
  import {ref, onMounted} from 'vue'
  import {useRouter} from "vue-router";
  import pondApi from "src/Api/Store/pondApi";
  import moment from "moment";

  export default {
    setup(){
      const router = useRouter()

      const pond_id = ref(localStorage.getItem('pond_detail_id') || '')
      const dataDetail = ref({})
      const pondType = ref({})
      const adoptDetail = ref({})
      const address3Detail = ref({})
      const address2Detail = ref({})
      const address1Detail = ref({})
      const imgList = ref([])

      const getDetail = async function(){
        const detail = await pondApi.getPondDetail(parseInt(pond_id.value))
        dataDetail.value = detail
        pondType.value = detail.pond_categorizes
        adoptDetail.value = detail.adopt_fish_areas
        address3Detail.value = detail.adopt_fish_areas.address_level_1.address_level_2.address_level_3
        address2Detail.value = detail.adopt_fish_areas.address_level_1.address_level_2
        address1Detail.value = detail.adopt_fish_areas.address_level_1
      }

      const getImageList= async function(){
        const list = await pondApi.getImagePond(parseInt(pond_id.value))
        imgList.value = list
      }

      onMounted(()=>{
        getDetail()
        getImageList()
        if(!pond_id.value){
          btnBack()
        }
      })

      const btnBack = function () {
        router.push({ path: '/' })
      }

      return {
        moment,
        btnBack,
        pond_id,
        pondType,
        adoptDetail,
        address3Detail,
        address2Detail,
        address1Detail,
        imgList,
        dataDetail
      }
    }
  }
</script>
