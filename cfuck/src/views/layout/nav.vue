<template>
    <div class="aside-nav">
        <nav class="nav-list">

        </nav>
    </div>
</template>

<script>
export default {
  name: 'nav'
}
</script>

<style lang="scss" scoped>
    @import '~assets/sass/variables';
    .aside-nav {
        position: fixed;
        top: 5.5em;
        display: inline-block;
        width: 11.5em;

        .nav-list {
            padding: 0;
            margin: 0;

            > .item-hr {
                margin: 2em 1em 1em 1em;
                border-top: 1px dashed #d6d6d6;
            }

            > .item {
                border: none;
                display: block;
                width: 100%;
                height: 3em;
                line-height: 3em;
                padding: 0 1em;
                text-decoration: none;
                text-transform: uppercase;
                font-weight: 700;
                border-radius: 1px;
                color: #777;
                font-family: CenturyGothic;
                margin-bottom: .5em;

                &.app {
                    // margin-top: 0em;
                    // color: $primary;
                }

                &:last-child {
                    margin-bottom: 0;
                }

                &:hover {
                    color: $primary;
                }

                &.link-active {
                    background-color: #eee;
                    font-weight: bold;
                    color: $primary;
                    background-color: $module-bg;
                }

                .iconfont {
                    width: 1em;
                    margin-right: 1em;
                    display: inline-block;
                }
            }
        }
    }
</style>
