<script setup lang="ts">
import { onMounted } from 'vue'
import { testDatabase } from '@/services/sqliteService'

onMounted(async () => {
    const db = await testDatabase()

    console.log(db)
})
</script>