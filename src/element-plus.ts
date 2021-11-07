import './assets/element-custom-theme/index.css'
// import 'element-plus/lib/theme-chalk/index.css'
// import './element-variables.scss'
import lang from 'element-plus/lib/locale/lang/ru'
import 'dayjs/locale/ru'
import locale from 'element-plus/lib/locale'
import {
  // ElAlert,
  // ElAside,
  // ElAutocomplete,
  // ElAvatar,
  // ElBacktop,
  // ElBadge,
  // ElBreadcrumb,
  // ElBreadcrumbItem,
  ElButton,
  // ElButtonGroup,
  ElCalendar,
  ElCard,
  // ElCarousel,
  // ElCarouselItem,
  // ElCascader,
  // ElCascaderPanel,
  ElCheckbox,
  // ElCheckboxButton,
  // ElCheckboxGroup,
  // ElCol,
  // ElCollapse,
  // ElCollapseItem,
  // ElCollapseTransition,
  // ElColorPicker,
  ElContainer,
  // ElDatePicker,
  // ElDialog,
  // ElDivider,
  // ElDrawer,
  // ElDropdown,
  // ElDropdownItem,
  // ElDropdownMenu,
  // ElFooter,
  ElForm,
  ElFormItem,
  ElHeader,
  // ElIcon,
  // ElImage,
  ElInput,
  // ElInputNumber,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  // ElOption,
  // ElOptionGroup,
  // ElPageHeader,
  // ElPagination,
  // ElPopconfirm,
  // ElPopover,
  // ElPopper,
  // ElProgress,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  // ElRate,
  // ElRow,
  // ElScrollbar,
  // ElSelect,
  ElSlider,
  // ElStep,
  // ElSteps,
  ElSubmenu,
  // ElSwitch,
  // ElTabPane,
  ElTable,
  ElTableColumn,
  // ElTabs,
  // ElTag,
  // ElTimePicker,
  // ElTimeSelect,
  // ElTimeline,
  // ElTimelineItem,
  // ElTooltip,
  // ElTransfer,
  // ElTree,
  ElUpload,
  ElInfiniteScroll,
  // ElLoading,
  // ElMessage,
  ElMessageBox,
  ElNotification,
} from 'element-plus'

export const components = [
  // ElAlert,
  // ElAside,
  // ElAutocomplete,
  // ElAvatar,
  // ElBacktop,
  // ElBadge,
  // ElBreadcrumb,
  // ElBreadcrumbItem,
  ElButton,
  // ElButtonGroup,
  ElCalendar,
  ElCard,
  // ElCarousel,
  // ElCarouselItem,
  // ElCascader,
  // ElCascaderPanel,
  ElCheckbox,
  // ElCheckboxButton,
  // ElCheckboxGroup,
  // ElCol,
  // ElCollapse,
  // ElCollapseItem,
  // ElCollapseTransition,
  // ElColorPicker,
  ElContainer,
  // ElDatePicker,
  // ElDialog,
  // ElDivider,
  // ElDrawer,
  // ElDropdown,
  // ElDropdownItem,
  // ElDropdownMenu,
  // ElFooter,
  ElForm,
  ElFormItem,
  ElHeader,
  // ElIcon,
  // ElImage,
  ElInput,
  // ElInputNumber,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  // ElOption,
  // ElOptionGroup,
  // ElPageHeader,
  // ElPagination,
  // ElPopconfirm,
  // ElPopover,
  // ElPopper,
  // ElProgress,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  // ElRate,
  // ElRow,
  // ElScrollbar,
  // ElSelect,
  ElSlider,
  // ElStep,
  // ElSteps,
  ElSubmenu,
  // ElSwitch,
  // ElTabPane,
  ElTable,
  ElTableColumn,
  // ElTabs,
  // ElTag,
  // ElTimePicker,
  // ElTimeSelect,
  // ElTimeline,
  // ElTimelineItem,
  // ElTooltip,
  // ElTransfer,
  // ElTree,
  ElUpload,
] as Array<any>

export const plugins = [
  ElInfiniteScroll,
  // ElLoading,
  // ElMessage,
  ElMessageBox,
  ElNotification,
] as Array<any>

locale.use(lang)

export type EPRuleType = {
  field: string,
  message: string
}