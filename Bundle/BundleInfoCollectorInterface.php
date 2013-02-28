<?php
namespace Arnm\CoreBundle\Bundle;

/**
 * This interface defines functionality of bundle info collector.
 * This collector is used as a service and bundles are registered with this collector.
 *
 * @author Alex Agulyansky <alex@iibspro.com>
 */
interface BundleInfoCollectorInterface
{
    /**
     * Registers single bundle info  with the collector
     *
     * @param BundleInfoInterface $bundleInfo
     *
     * @return BundleInfoCollectorInterface
     */
    public function register(BundleInfoInterface $bundleInfo);
}
