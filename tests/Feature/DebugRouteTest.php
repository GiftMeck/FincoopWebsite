<?php
namespace Tests\Feature;
use App\Models\Account;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
class DebugRouteTest extends TestCase
{
    use DatabaseTransactions;
    protected function setUp(): void
    {
        parent::setUp();
        // Warm up the HTTP kernel DB connection so later reads see the tx.
        $this->getJson("/accounts/verify?account_number=__warmup__");
    }
    public function test_a_create_then_verify(): void
    {
        Account::create(["account_number" => "FIN-A", "full_name" => "A"]);
        $r = $this->getJson("/accounts/verify?account_number=FIN-A");
        fwrite(STDERR, "\nWARMUP_A_STATUS=" . $r->getStatusCode() . "\n");
        $this->assertTrue(true);
    }
}